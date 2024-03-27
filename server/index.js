import { randomBytes } from "crypto";
import { createServer } from "http";
import serverless from "serverless-http";

const cards = {}
const keys = []

function createPost(title, creater, content) {
    const id = randomBytes(10).toString("base64url")

    cards[id] = {
        title,
        meta: `${new Date().toDateString()} ${creater}`,
        content
    }

    keys.push(id)

    return id
}

createPost("test 001", "me", "Hello World")

const app = createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")

    var url = new URL("http://localhost" + req.url)

    if (url.pathname == "/.netlify/functions/index/random") {
        const id = keys[Math.floor(Math.random() * keys.length)]
        return res.end(JSON.stringify(
            {
                ...cards[id],
                id
            }
        ))
    }

    if (url.pathname == "/.netlify/functions/index/id") {
        const id = url.searchParams.get("id")
        return res.end(JSON.stringify(
            {
                ...(cards[id] ?? {}),
                id
            }
        ))
    }

    res.end(
        createPost(
            url.searchParams.get("title"),
            url.searchParams.get("creater"),
            url.searchParams.get("content")
        )
    )

})

process.on("uncaughtException", err => console.log(err))


export var handler = serverless(app);
