import express from "express";
import Userdata from "./models/Userdata.js";
import User from "./models/Usersdb.js";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(express.static(path.join(__dirname, "Public")));

//__mongodb setup__________________________________
const url =
  "mongodb+srv://admin:SKd6tK5pAbQuSMqH@cluster0.4zyc7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e);
  });
//_________________________________________________________

//? handling the upload data
app.post("/uploads", (req, res) => {
  const { email, uploads } = req.body;
  Userdata.findOne({ email: email }, (err, user) => {
    if (user) {
      Userdata.findOneAndUpdate(
        { email: email },
        {
          $push: { uploads: uploads },
        },
        (err) => {
          console.log(err);
        }
      );
      res.send("successfully uploded");
    } else {
      const temp = {
        email: email,
        uploads: [uploads],
      };
      Userdata.create(req.body, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    }
  });
});

//! delete the uploaded item
app.get("/delete", (req, res) => {
  const { id, email } = req.query;
  Userdata.findOneAndUpdate(
    { email: email },
    {
      $pull: { uploads: { id: id } },
    },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("item remove");
      }
    }
  );
});

//! updating the status from the power admin
app.get("/pstatusupdate", (req, res) => {
  const { email, id, status } = req.query;

  Userdata.findOneAndUpdate(
    {
      email: email,
      uploads: {
        $elemMatch: {
          id: id,
        },
      },
    },
    { $set: { "uploads.$.power_admin": status } },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

//? status handling for super admin
app.get("/sstatusupdate", (req, res) => {
  const { email, id, status } = req.query;

  Userdata.findOneAndUpdate(
    {
      email: email,
      uploads: {
        $elemMatch: {
          id: id,
        },
      },
    },
    { $set: { "uploads.$.super_admin": status } },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

//? sending all data to both admin pages
app.get("/getalldata", (req, res) => {
  const data = Userdata.find((err, data) => {
    if (err) {
      res.send("error in finding the data");
    } else {
      res.send(data);
    }
  });
});

//? sending the user data to particular user page
app.get("/getdata", (req, res) => {
  const { email } = req.query;

  Userdata.find({ email: req.query.email }, (err, data) => {
    if (data) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

//! _______routes for the login and register
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.status(201).send({ message: "login successfull", user: user });
      } else {
        res.status(401).send({ message: "incorrect password!!" });
      }
    } else {
      res.status(404).send({ message: "User not register" });
    }
  });
});

app.post("/register", (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(409).send({ message: "User already exist" });
    } else {
      User.create(req.body, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send({ message: "User registered sucessfully" });
          console.log(data);
        }
      });
    }
  });
});

//!________________________________

app.post("/upload", upload.single("image"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  var obj = {
    username: req.body.name,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/Images/" + req.file.filename)
      ),

      contentType: req.file.mimetype,
    },
    power_status: false,
    super_status: false,
  };
  Userdata.create(obj, (err, item) => {
    if (err) {
      console.log("error in uploading data to mongodb");
    } else {
      console.log("uploaded to mongodb");
      res.send(obj.img);
    }
  });
});

app.get("/getData", (req, res) => {
  Userdata.find((err, items) => {
    if (err) {
      res.status(500).send("An error occurred", err);
    } else {
      res.send(items);
    }
  });
});

app.listen(PORT, console.log(`listening to port ${PORT}`));
