/**
 * ZELDA ENGINE 2026 - GITHUB PAGES STABLE VERSION
 */

function checkReady() {
    // Wacht tot THREE en de UI elementen geladen zijn
    if (typeof THREE !== 'undefined' && document.getElementById('hearts')) {
        console.log("Alles geladen! Game start...");
        initGame();
    } else {
        console.log("Wachten op bibliotheken...");
        setTimeout(checkReady, 100); // Probeer elke 100ms opnieuw
    }
}

function initGame() {
    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Blauwe lucht
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 2. LICHT (Zonder dit zie je niks!)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(10, 10, 10);
    scene.add(sun);

    // 3. DE WERELD
    // Grasveld
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({ color: 0x228B22 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Obstakels (zodat je diepte ziet)
    for(let i=0; i<10; i++) {
        const pillar = new THREE.Mesh(
            new THREE.BoxGeometry(1, 4, 1),
            new THREE.MeshStandardMaterial({ color: 0x8B4513 })
        );
        pillar.position.set(Math.random()*40-20, 2, Math.random()*40-20);
        scene.add(pillar);
    }

    // 4. SPELER (LINK)
    const player = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 1, 4, 8),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );
    player.position.y = 1;
    scene.add(player);

    // 5. CONTROLS
    const keys = {};
    window.addEventListener('keydown', (e) => keys[e.code] = true);
    window.addEventListener('keyup', (e) => keys[e.code] = false);

    // 6. GAME LOOP
    function animate() {
        requestAnimationFrame(animate);

        const speed = 0.15;
        if (keys['KeyW']) player.position.z -= speed;
        if (keys['KeyS']) player.position.z += speed;
        if (keys['KeyA']) player.position.x -= speed;
        if (keys['KeyD']) player.position.x += speed;

        // Camera volgt de speler
        camera.position.set(player.position.x, player.position.y + 10, player.position.z + 12);
        camera.lookAt(player.position);

        renderer.render(scene, camera);
    }

    animate();

    // Resize handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Start de controle-check
checkReady();
