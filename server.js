const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // GET /health
    if (method === "GET" && url === "/health") {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });

        res.end(
            JSON.stringify({
                status: "ok",
                uptime: Math.floor(process.uptime()),
            })
        );
        return;
    }

    // POST /echo
    if (method === "POST" && url === "/echo") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);

                res.writeHead(201, {
                    "Content-Type": "application/json",
                });

                res.end(
                    JSON.stringify({
                        data,
                    })
                );
            } catch (error) {
                res.writeHead(400, {
                    "Content-Type": "application/json",
                });

                res.end(
                    JSON.stringify({
                        error: "Invalid JSON",
                    })
                );
            }
        });

        return;
    }

    // 404 for unknown routes
    res.writeHead(404, {
        "Content-Type": "application/json",
    });

    res.end(
        JSON.stringify({
            error: "Route not found",
        })
    );
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});