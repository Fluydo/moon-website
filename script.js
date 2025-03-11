const image = document.querySelector('.image');

image.addEventListener('mousemove', (e) => {
    const rect = image.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;

    // Apply the smooth 3D rotation and shadow change on mouse move
    image.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
});

image.addEventListener('mouseleave', () => {
    // Reset the transform and shadow when the mouse leaves
    image.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
});
