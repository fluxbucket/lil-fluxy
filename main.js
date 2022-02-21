import kaboom from "kaboom";

kaboom();

const FLOOR_HEIGHT = 48
const JUMP_FORCE = 1000
const SPEED = 300

// Update to custom sprite
loadSprite('colin', './images/colin-fit.png');
loadSprite('bg', './images/bg.png');
loadFont("dogica", "https://raw.githubusercontent.com/fluxbucket/lil-fluxy/main/fonts/02.png", 8, 8)

scene("game", () => {
    gravity(2400)

    add([
        sprite('bg', {width: width(), height: height()}),
    ])

    const fluxy = add([
        sprite("colin",),
        pos(80, 40),
        area(),
        body(),
    ])

    // Add platform
    add([
        rect(width(), FLOOR_HEIGHT),
        pos(0, height() - FLOOR_HEIGHT),
        outline(4),
        area(),
        solid(),
        color(9,1,52),
    ])


    window.onload = function() {
        var input = document.getElementById("app").click();
    }

    function jump() {
        if (fluxy.isGrounded()) {
            fluxy.jump(JUMP_FORCE)
        }
    }

    onKeyPress("space", jump)
    onKeyRelease("space", () => {
        gravity(3200)
    })
    onKeyPressRepeat("space", () => {
        gravity(1000)
    })

    function spawnTree() {
        const enemies = [
            {
                label: "Scope Creep",
                size: 25, 
            },
            {
                label: "Miscommunicate",
                size: 20, 
            },
            {
                label: "Burnout",
                size: 20, 
            },
            {
                label: "Lance",
                size: 30, 
            },
            {
                label: "Puppy Licking Me",
                size: 20, 
            },
            {
                label: "Thomas on vacation",
                size: 20, 
            },
        ]
        const random = Math.floor(Math.random() * enemies.length);
        add([
            rect(30, rand(32, 96)),
            text(enemies[random].label, {size: enemies[random].size, color: 'black', font: "dogica"}),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            origin("botleft"),
            color(225, 225, 225),
            move(LEFT, SPEED),
            cleanup(),
            "tree",
        ])

        wait(rand(2.0, 3.0), spawnTree)

    }
    spawnTree()


    let score = 0

    const scoreLabel = add([
        text(score),
        pos(50, 100),
    ])

    onUpdate(() => {
        score++
        scoreLabel.text = score
    })

    add([
        text('Made by fluxbucket.com'),
        pos(50, 25),
        scale(.25),
        origin("topleft"),
    ])

    add([
        text('Press (and/or hold) space to jump.'),
        pos(50, 60),
        scale(.5),
        origin("topleft"),
    ])

    fluxy.onCollide("tree", () => {
        addKaboom(fluxy.pos);
        go("lose", score)
        burp()
        addKaboom(fluxy.pos)
    })
})

add([
    sprite('bg', {width: width(), height: height()}),
])

add([
    text('Click or press space to make Colin fight'),
    pos(width() / 2, height() / 2 + 200),
    scale(.5),
    origin("center"),
])
add([
    text('things that make him angry'),
    pos(width() / 2, height() / 2 + 250),
    scale(.4),
    origin("center"),
])

add([
    text('Made by fluxbucket.com'),
    pos(20, height() - 20),
    scale(.25),
    origin("botleft"),
])

onKeyPress("space", () => go("game"))
onClick(() => go("game"))

scene("lose", (score) => {

    add([
        sprite('bg', {width: width(), height: height()}),
    ])

	add([
		sprite("colin"),
		pos(width() / 2, height() / 2 - 80),
		scale(2),
		origin("center"),
	])

	add([
		text(score),
		pos(width() / 2, height() / 2 + 80),
		scale(2),
		origin("center"),
	])

    add([
		text('Click or space to make Colin fight again.'),
		pos(width() / 2, height() / 2 + 200),
        scale(.5),
		origin("center"),
	])


	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

})
