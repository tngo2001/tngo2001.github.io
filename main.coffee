# Setup

scene = new THREE.Scene()

camera = new THREE.PerspectiveCamera 75, window.innerWidth / window.innerHeight, 0.1, 1000

renderer = new THREE.WebGLRenderer
  canvas: document.querySelector('#bg')

renderer.setPixelRatio window.devicePixelRatio
renderer.setSize window.innerWidth, window.innerHeight
window.addEventListener 'resize', ->
  renderer.setSize window.innerWidth, window.innerHeight
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
camera.position.setZ 30
camera.position.setX -3

renderer.render scene, camera

# Torus

geometry = new THREE.TorusGeometry 10, 3, 16, 100
material = new THREE.MeshStandardMaterial wireframe: true
torus = new THREE.Mesh geometry, material

scene.add torus

# Lights

pointLight = new THREE.PointLight 0xffffff
pointLight.position.set 5, 5, 5

ambientLight = new THREE.AmbientLight 0xffffff
scene.add pointLight, ambientLight

# Helpers

# lightHelper = new THREE.PointLightHelper(pointLight)
# gridHelper = new THREE.GridHelper(200, 50)
# scene.add lightHelper, gridHelper

# controls = new OrbitControls(camera, renderer.domElement)

addStar = ->
  geometry = new THREE.SphereGeometry 0.25, 24, 24
  material = new THREE.MeshStandardMaterial color: 0xffffff
  star = new THREE.Mesh geometry, material

  scale = Math.random() * 0.5 + 0.1
  star.scale.set scale, scale, scale

  [x, y, z] = Array(3).fill().map -> THREE.MathUtils.randFloatSpread 100

  star.position.set x, y, z
  scene.add star

Array(2000).fill().forEach addStar

# Avatar

pictureTexture = new THREE.TextureLoader().load 'https://i.imgur.com/vXaFLyI.jpg'

picture = new THREE.Mesh new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial map: pictureTexture

scene.add picture

moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial wireframe: true
)

scene.add moon

moon.position.z = 30
moon.position.setX -10

picture.position.z = -5
picture.position.x = 2

# Scroll Animation

moveCamera = ->
  t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  picture.rotation.y += 0.02

  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.rotation.y = t * -0.0002

document.body.onscroll = moveCamera
moveCamera()

# Animation Loop

animate = ->
  requestAnimationFrame animate

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  moon.rotation.x += 0.005

  renderer.render scene, camera

animate()

initSlideshow = (slideshowId) ->
  slideIndex = 1

  showSlides = (n, slideshowId) ->
    `var i`
    slides = document.querySelectorAll('#' + slideshowId + ' .slides div')
    dots = document.querySelectorAll('#' + slideshowId + ' .dot')
    if n > slides.length
      slideIndex = 1
    if n < 1
      slideIndex = slides.length
    i = 0
    while i < slides.length
      slides[i].style.display = 'none'
      i++
    i = 0
    while i < dots.length
      dots[i].className = dots[i].className.replace(' active', '')
      i++
    slides[slideIndex - 1].style.display = 'block'
    dots[slideIndex - 1].className += ' active'
    return

  moveSlide = (n, slideshowId) ->
    slideIndex += n
    showSlides slideIndex, slideshowId
    return

  currentSlide = (n, slideshowId) ->
    slideIndex = n
    showSlides slideIndex, slideshowId
    return

  showSlides slideIndex, slideshowId
  document.querySelector('#' + slideshowId + ' .prev').addEventListener 'click', ->
    moveSlide -1, slideshowId
    return
  document.querySelector('#' + slideshowId + ' .next').addEventListener 'click', ->
    moveSlide 1, slideshowId
    return

  dots = document.querySelectorAll('#' + slideshowId + ' .dot')
  dots.forEach (dot, index) ->
    dot.addEventListener "click", ->
      currentSlide(index + 1, slideshowId)
  return

document.addEventListener 'DOMContentLoaded', ->
  initSlideshow 'experience'
  initSlideshow 'projects'
  return