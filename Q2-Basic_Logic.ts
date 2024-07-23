function createTriangle(x: number): void {
    for (let i = 1; i <= x; i++) {
        let spaces = '';
        let hashes = '';
        
        for (let j = 0; j < x - i; j++) {
            spaces += ' ';
        }
        for (let k = 0; k < i; k++) {
            hashes += '#';
        }
        
        console.log(spaces + hashes);
    }
}

createTriangle(3);
