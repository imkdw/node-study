import crypto from "crypto";

interface BlockShape {
  prevHash: string; // 이전 블록 해시
  height: number; // 블럭 높이(1,2,3,4,5...)
  data: string; // 값들
}

class Block implements BlockShape {
  public hash: string;

  constructor(public prevHash: string, public height: number, public data: string) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string): string {
    const toHash = prevHash + height + data;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }

  public getBlocks() {
    return this.blocks;
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("first");
blockchain.addBlock("second");
blockchain.addBlock("third");
console.log(blockchain.getBlocks());
