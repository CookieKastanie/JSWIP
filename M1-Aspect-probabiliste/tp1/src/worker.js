self.onmessage = e => {
    const d = e.data;

    const t0 = performance.now();
    const result =  eval(d.func); 
    const t1 = performance.now();

    self.postMessage({
        id: d.id,
        result,
        seconds: (t1 - t0) * 0.001
    });
};
