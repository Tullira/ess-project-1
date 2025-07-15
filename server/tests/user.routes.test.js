import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import userRoutes from "../routes/user.routes.js";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

// Configuração do banco de dados em memória
beforeAll(async () => {
  const url = "mongodb+srv://tfcl:byBDc2RpYRBYGiQk@cluster0.q8lmdsw.mongodb.net/";
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany();
});

describe("User Routes", () => {
  describe("POST /users", () => {
    it("deve criar um usuário válido", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: "João", email: "joao@email.com", password: "123456" });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "João");
      expect(res.body).toHaveProperty("email", "joao@email.com");
      expect(res.body).not.toHaveProperty("password");
    });

    it("não deve criar usuário com campos faltando", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: "João", email: "" });
      expect(res.statusCode).toBe(400);
    });

    it("não deve criar usuário com email já existente", async () => {
      await User.create({
        name: "Maria",
        email: "maria@email.com",
        password: "123456",
      });
      const res = await request(app)
        .post("/users")
        .send({ name: "Maria", email: "maria@email.com", password: "654321" });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /users", () => {
    it("deve retornar todos os usuários", async () => {
      await User.create({
        name: "Ana",
        email: "ana@email.com",
        password: "123456",
      });
      const res = await request(app).get("/users");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).not.toHaveProperty("password");
    });
  });

  describe("GET /users/:id", () => {
    it("deve retornar um usuário pelo id", async () => {
      const user = await User.create({
        name: "Carlos",
        email: "carlos@email.com",
        password: "123456",
      });
      const res = await request(app).get(`/users/${user._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Carlos");
      expect(res.body).not.toHaveProperty("password");
    });

    it("deve retornar 404 se usuário não existir", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/users/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /users/:id", () => {
    it("deve atualizar um usuário existente", async () => {
      const user = await User.create({
        name: "Pedro",
        email: "pedro@email.com",
        password: "123456",
      });
      const res = await request(app)
        .put(`/users/${user._id}`)
        .send({ name: "Pedro Atualizado" });
      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty("name", "Pedro Atualizado");
    });

    it("não deve atualizar para email já existente", async () => {
      await User.create({
        name: "Lucas",
        email: "lucas@email.com",
        password: "123456",
      });
      const user = await User.create({
        name: "Rafael",
        email: "rafael@email.com",
        password: "123456",
      });
      const res = await request(app)
        .put(`/users/${user._id}`)
        .send({ email: "lucas@email.com" });
      expect(res.statusCode).toBe(400);
    });

    it("deve retornar 404 se usuário não existir", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/users/${fakeId}`)
        .send({ name: "Novo Nome" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /users/:id", () => {
    it("deve deletar um usuário existente", async () => {
      const user = await User.create({
        name: "Bruno",
        email: "bruno@email.com",
        password: "123456",
      });
      const res = await request(app).delete(`/users/${user._id}`);
      expect(res.statusCode).toBe(200);
    });

    it("deve retornar 404 se usuário não existir", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/users/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
