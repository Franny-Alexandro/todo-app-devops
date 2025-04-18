const request = require("supertest");
const app = require("../server"); // exporta tu app sin `.listen`

describe("GET /tasks", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toEqual(200);
  });
});
