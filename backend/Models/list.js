import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // each list item must belong to a user
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Not started", "In progress", "Completed"],
      default: "Not started",
    },
    note: {
      type: String,
    },
    platform: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

export default List;
