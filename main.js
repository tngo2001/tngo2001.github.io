import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const scale = Math.random() * 0.5 + 0.1;
  star.scale.set(scale, scale, scale);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStar);

// Avatar

const pictureTexture = new THREE.TextureLoader().load('https://i.imgur.com/vXaFLyI.jpg');

const picture = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: pictureTexture }));

scene.add(picture);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ wireframe: true })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

picture.position.z = -5;
picture.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  picture.rotation.y += 0.02;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();

document.addEventListener("DOMContentLoaded", function() {
  initSlideshow("experience");
  initSlideshow("projects");
});

function initSlideshow(slideshowId) {
  let slideIndex = 1;
  showSlides(slideIndex, slideshowId);

  document.querySelector(`#${slideshowId} .prev`).addEventListener("click", function() {
      moveSlide(-1, slideshowId);
  });

  document.querySelector(`#${slideshowId} .next`).addEventListener("click", function() {
      moveSlide(1, slideshowId);
  });

  let dots = document.querySelectorAll(`#${slideshowId} .dot`);
  dots.forEach((dot, index) => {
      dot.addEventListener("click", function() {
          currentSlide(index + 1, slideshowId);
      });
  });

  function showSlides(n, slideshowId) {
      let slides = document.querySelectorAll(`#${slideshowId} .slides div`);
      let dots = document.querySelectorAll(`#${slideshowId} .dot`);

      if (n > slides.length) slideIndex = 1;
      if (n < 1) slideIndex = slides.length;

      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }

      for (let i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }

      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
  }

  function moveSlide(n, slideshowId) {
      slideIndex += n;
      showSlides(slideIndex, slideshowId);
  }

  function currentSlide(n, slideshowId) {
      slideIndex = n;
      showSlides(slideIndex, slideshowId);
  }
}