const math = require("./math")

for (let i = 1; i <= 7; ++i) {
	process.stdout.write(`${math.fibonnaci(i)} `)
}
for (let i = 8; i <= 16; ++i) {
	process.stderr.write(`${math.fibonnaci(i)} `)
}

process.exit(1)