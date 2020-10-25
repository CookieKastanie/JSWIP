const shuffle = arr => {
    let count = arr.length, temp, index;

    while(count > 0){
        index = Math.floor(Math.random() * count);
        count--;

        temp = arr[count];
        arr[count] = arr[index];
        arr[index] = temp;
    }
}

fetch('liste_francais.txt')
.then(res => res.text())
.then(text => {
    const res = new Set();
    text.split('\n').forEach(v => {
        if(v.match('tiq')) {
            let m = v.split('tiq')[0];
            m += 'tikitik';
            m = m.charAt(0).toUpperCase() + m.substr(1, m.length);
            res.add(m);
        } else if(v.match('tic') && !v.match('tice') && !v.match('tica') && !v.match('tick') && !v.match('ticu')) {
            let m = v.split('tic')[0];
            m += 'tikitik';
            m = m.charAt(0).toUpperCase() + m.substr(1, m.length);
            res.add(m);
        }
    });

    const final = new Array();
    res.forEach(v => final.push(v));

    shuffle(final);

    let newText = '';
    final.forEach(v => newText += v + '\n');
    console.log(newText);
});
