function easeOut(progress) {
	function d(progress) {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
			if (progress >= (7 - 4 * a) / 11)
				return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
        }
	}
	return 1 - d(1 - progress);
}


function delta(progress) {
    return 1 - Math.sin((1 - progress) * Math.PI / 2);

}

export default function(f, to, duration, fn) {
	var start = new Date().getTime(); // Время старта

	setTimeout(function ani() {
	    let now = (new Date().getTime()) - start; // Текущее время
	    let progress = now / duration; // Прогресс анимации

	    if (progress > 1)
			progress = 1;

		var result = (to - f) * delta(progress) + f;

		fn(result, progress);

	    if (progress < 1) // Если анимация не закончилась, продолжаем
	        setTimeout(ani, 0);
	}, 0);

}