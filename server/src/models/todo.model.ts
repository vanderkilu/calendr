import { Todo } from "interfaces/todo.interface";
import * as mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    status: String,
    priority: Number,
    dueDate: String,
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<Todo & mongoose.Document>("Todo", TodoSchema);
export default OrderModel;
