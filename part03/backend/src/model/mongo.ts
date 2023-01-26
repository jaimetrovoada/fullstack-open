import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log(
    "invalid arguments. did you forget to write a password, name or number?"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jaime:${password}@cluster0.bqj3pgg.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3) {
  const name = process.argv[3];
  const phoneNumber = process.argv[4];

  const person = new Person({
    name: name,
    phoneNumber: phoneNumber,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${phoneNumber} to phonebook`);
    console.log({ result });
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    if (!result.length || !result) {
      console.log("phonebook is empty")
    }
    result.forEach((person) => {
      console.log(`${person.name} ${person.phoneNumber}`);
    });
    mongoose.connection.close();
  });
}
