let scene, camera, renderer, player, enemies = [];
let keys = {};

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Licht
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(5, 10, 7.5);
    scene.add(sun, new THREE.AmbientLight(0x404040));

    // Grond
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({ color: 0x228B22 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Speler
    player = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.4, 1, 4, 8),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );
    player.position.y = 1;
    scene.add(player);

    window.addEventListener('keydown', e => keys[e.code] = true);
    window.addEventListener('keyup', e => keys[e.code] = false);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const speed = 0.15;
    if(keys['KeyW']) player.position.z -= speed;
    if(keys['KeyS']) player.position.z += speed;
    if(keys['KeyA']) player.position.x -= speed;
    if(keys['KeyD']) player.position.x += speed;

    camera.position.set(player.position.x, player.position.y + 8, player.position.z + 10);
    camera.lookAt(player.position);
    renderer.render(scene, camera);
}

window.onload = init;
