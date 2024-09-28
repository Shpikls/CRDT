class LinkedList {
    payload;
    next;

    constructor(payload) {
        this.payload = String(payload);
        this.next = null;
    }

    add(payload) {
        if (this.next === null) {
            return this.next = new LinkedList(payload);
        }

        return this.next.add(payload);
    }

    insert(payload, target) {
        if (this.payload === String(target)) {
            const newList = new LinkedList(payload);
            newList.next = this.next;
            this.next = newList;
        } else {
            this.next.insert(payload, target)
        }
    }

    delete(target, prev = null) {
        if (this.payload === String(target)) {
            prev.next = this.next;
        } else {
            this.next?.delete(target, this);
        }
    }

    toString() {
        if (this.next === null) {
            return this.payload
        }

        return this.payload + this.next.toString();
    }
}

const list = new LinkedList(1);
list.add(2);
list.add(3);
list.insert(1, '2');
list.delete(3);
// list.delete(1);

console.log(list.toString())