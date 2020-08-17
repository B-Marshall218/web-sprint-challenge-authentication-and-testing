const server = require("./server.js");

const supertest = require("supertest");


describe("server", function () {
    it("runs the test", function () {
        expect(true).toBe(true)
    })

    describe("GET /", function () {
        it("should respond with 401 not authorized ", function () {
            return supertest(server)
                .get("/api/jokes")
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
    })
})

describe("register /api/auth/register", function () {
    it("should respond with 400 since theres no way to put in creds", function () {
        return supertest(server)
            .post("/api/auth/register")
            .then(res => {
                expect(res.status).toBe(400)
            })
    })
})

describe("register works", function () {
    it("should return json user and password code", function () {
        return supertest(server)
            .post("/api/auth/register")
            .then(res => {
                expect(res.type).toMatch(/json/i);
            })
    })

})

describe("login/api/auth/login", function () {
    it("should respond with 400 since theres no way to put in creds", function () {
        return supertest(server)
            .post("/api/auth/login")
            .then(res => {
                expect(res.status).toBe(400)
            })
    })
})

describe("login works", function () {
    it("should return json welcome and token", function () {
        return supertest(server)
            .post("/api/auth/login")
            .then(res => {
                expect(res.type).toMatch(/json/i);
            })
    })

})

