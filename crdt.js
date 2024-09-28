class CRDTTextEditor {
    operation = [];
    text = '';
    clientId = '';

    constructor(initText, clientId) {
        this.text = initText;
        this.operation = [];
        this.clientId = clientId;
    }

    insert(char, start) {
        const timestamp = new Date();
        this.operation.push({ char, timestamp, start });
        console.log(`Inserted "${char}" with timestamp ${timestamp} by ${this.clientId}`);
    }

    sync(remoteOps) {
        this.operation.push(...remoteOps.filter((remoteOps) => {
            for (const localOps of this.operation) {
                if (remoteOps.char === localOps.char && remoteOps.timestamp === localOps.timestamp) {
                    return false
                }
            }

            return true;
        }));
    }

    getText() {
        console.log(`Initial text is "${this.text}"`);
        return this.operation.sort((a, b) => a.timestamp - b.timestamp).reduce((acc, operation) => {
            console.log(`Apply operation is char: ${operation.char}, timestamp: ${Number(operation.timestamp)}`);
            return acc + operation.char;
        }, [this.text]);
    }

    getOperation() {
        return this.operation;
    }
}

const initText = 'Hello!'
const editor1 = new CRDTTextEditor(initText, 'user1');
const editor2 = new CRDTTextEditor(initText, 'user2');

async function test() {
    editor1.insert('reader', 4);
    await sleep(20);
    editor2.insert('l');
    await sleep(20);
    editor1.insert('o');
    await sleep(20);
    editor2.insert('!');
    await sleep(20);

    editor1.sync(editor2.getOperation());

    console.log(editor1.getText());

    editor2.sync(editor1.getOperation());

    console.log(editor2.getText());
}

function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout);
    })
}

test();