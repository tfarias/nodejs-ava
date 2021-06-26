import test from "ava";
import req from "supertest";
import mongoose from "mongoose";
import app from "./../src/app";

test.beforeEach((t: any) => {
  t.context = {
    server: req(app),
  };
});

test("UserRoute::POST - Create a new User", async (t: any) => {
  const mockPost = {
    name: "Teste Silva",
    email: "teste@gmail.com",
    username: "teste",
    password: "12345",
  };

  const requestCreate = await t.context.server.post("/user").send(mockPost);

  t.is(requestCreate.status, 201);
});

test("UserRoute::GET - Find all Users", async (t: any) => {
  const { status, body } = await t.context.server.get("/user");

  t.is(status, 200);
  t.true(Array.isArray(body));
  t.truthy(body.length > 0);
});

test("UserRoute::GET - Find One User", async (t: any) => {
  const mockPost = {
    name: "Teste Silva",
    email: "teste@gmail.com",
    username: "teste",
    password: "12345",
  };

  const requestCreate = await t.context.server.post("/user").send(mockPost);
  const all = requestCreate.body;
  const mongoId = all._id;
  const { status, body } = await t.context.server.get(`/user/${mongoId}`);

  t.is(status, 200);
  t.is(body.name, all.name);
  t.true(typeof body === "object");
});

test("UserRoute:: GET - Finde One by id", async (t: any) => {
  const mongoId = "id_invaasaslid";
  const { status, body } = await t.context.server.get(`/user/${mongoId}`);
  t.is(status, 400);
});

test("UserRoute:: DELETE - Remove User by id", async (t: any) => {
  const all = await t.context.server.get("/user");

  const mongoId = all.body[0]._id;
  const { status } = await t.context.server.delete(`/user/${mongoId}`);

  t.is(status, 203);
});
