class GeometricScene {
  constructor() {
    this.container = document.getElementById('hero-canvas');
    if (!this.container) return;
    
    this.init();
    this.createScene();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    
    this.isMobile = window.innerWidth < 768;
    const aspect = this.container.clientWidth / this.container.clientHeight || 1;
    
    this.camera = new THREE.PerspectiveCamera(
      50,
      aspect,
      0.1,
      1000
    );
    this.camera.position.z = 3;
    
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    this.renderer.setSize(this.container.clientWidth || 400, this.container.clientHeight || 300);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
    
    this.clock = new THREE.Clock();
    
    window.addEventListener('resize', () => this.onResize());
  }

  createScene() {
    const wireMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0d7377,
      transparent: true,
      opacity: 0.9
    });
    
    const innerWireMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0d7377,
      transparent: true,
      opacity: 0.6
    });
    
    const accentMaterial = new THREE.LineBasicMaterial({ 
      color: 0x141414,
      transparent: true,
      opacity: 0.4
    });
    
    this.cube1 = this.createWireframeCube(0.6, wireMaterial);
    this.cube2 = this.createWireframeCube(1.0, innerWireMaterial);
    this.cube3 = this.createWireframeCube(1.4, accentMaterial);
    
    this.scene.add(this.cube1);
    this.scene.add(this.cube2);
    this.scene.add(this.cube3);
    
    this.scene.add(new THREE.AmbientLight(0xffffff, 1));
    
    const pointLight = new THREE.PointLight(0x0d7377, 0.5);
    pointLight.position.set(2, 2, 3);
    this.scene.add(pointLight);
  }

  createWireframeCube(size, material) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const edges = new THREE.EdgesGeometry(geometry);
    const cube = new THREE.LineSegments(edges, material);
    return cube;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    const t = this.clock.getElapsedTime();
    
    const speed = 0.15;
    this.cube1.rotation.x = t * speed;
    this.cube1.rotation.y = t * speed * 0.7;
    
    this.cube2.rotation.x = -t * speed * 0.5;
    this.cube2.rotation.y = t * speed * 0.8;
    
    this.cube3.rotation.x = t * speed * 0.3;
    this.cube3.rotation.y = -t * speed * 0.6;
    
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    if (!this.container) return;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GeometricScene();
});
