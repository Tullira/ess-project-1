import { Given, When, Then, BeforeAll, AfterAll, Before } from "@cucumber/cucumber";
import mongoose from "mongoose";
import assert from "assert";
import * as userService from "../../services/user.service.js";
import User from "../../models/user.model.js";

let context = {};

BeforeAll(async () => {
  await mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

AfterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

Before(async () => {
  await User.deleteMany();
  context = {};
});

// Background
Given("o banco de dados está limpo", async () => {
  await User.deleteMany();
});

// Cenário 1: Buscar por ID existente
Given("existe um usuário chamado {string}", async (name) => {
  const user = await userService.createUser({
    name,
    email: `${name.toLowerCase()}@email.com`,
    password: "123456",
  });
  context.user = user;
});

When("eu buscar o usuário por ID", async () => {
  context.result = await userService.getUserById(context.user._id);
});

Then("o nome do usuário retornado deve ser {string}", (expectedName) => {
  assert.ok(context.result);
  assert.strictEqual(context.result.name, expectedName);
});

// Cenário 2: Buscar por ID inexistente
Given("um ID que não existe", () => {
  context.fakeId = new mongoose.Types.ObjectId();
});

When("eu buscar o usuário por esse ID", async () => {
  context.result = await userService.getUserById(context.fakeId);
});

Then("o resultado deve ser null", () => {
  assert.strictEqual(context.result, null);
});

// Cenário 3: Atualizar nome
When("eu atualizar o nome desse usuário para {string}", async (newName) => {
  context.result = await userService.updateUser(context.user._id, {
    name: newName,
  });
});

Then("o nome do usuário atualizado deve ser {string}", (expectedName) => {
  assert.ok(context.result);
  assert.strictEqual(context.result.name, expectedName);
});
