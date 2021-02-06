let count = 0;

const counter = document.getElementById('value');
const btns = document.querySelectorAll(".btn");

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const styles = e.currentTarget.classList;

        if (styles.contains('decrease')) {
            count--;
        }
        else if (styles.contains('reset')) {
            count = 0;
        }
        else {
            count++;
        }

        counter.textContent = count;
        setColor(count);
    });
});

function setColor(count) {
    if (count == 0) {
        counter.style.color = 'black';
    }
    else if (count > 0) {
        counter.style.color = 'green';
    }
    else {
        counter.style.color = 'red';
    }
}