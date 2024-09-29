const {v4: uuid} = require('uuid');

class LinkedHash {
    linkedHash;

    constructor() {
        this.linkedHash = {head: {next: null}};
    }

    findTail(id = 'head') {
        const next = this.linkedHash[id].next;

        if (next === null) {
            return id;
        }

        return this.findTail(next);
    }

    push(data) {
        const id = uuid();
        const tailId = this.findTail();

        this.linkedHash[tailId].next = id;
        this.linkedHash[id] = {next:null, data};

        return {...this.linkedHash[id], id};
    }

    shift(data) {
        const id = uuid();
        const head = this.linkedHash['head'];
        this.linkedHash[id] = {next: head.next, data};
        this.linkedHash['head'].next = id;

        return {...this.linkedHash[id], id};
    }

    toString() {
        let string = '';
        let pointer = 'head';

        while (true) {
            if (pointer !== 'head') {
                string += this.linkedHash[pointer].data;
            }

            if (this.linkedHash[pointer].next === null) {
                break;
            }

            pointer = this.linkedHash[pointer].next;
        }

        return string;
    }
}

const linkedHash = new LinkedHash();
console.log(linkedHash);
linkedHash.push(2);
linkedHash.push(3);
linkedHash.push(4);
linkedHash.shift(1)
console.log(linkedHash);
console.log(linkedHash.toString());