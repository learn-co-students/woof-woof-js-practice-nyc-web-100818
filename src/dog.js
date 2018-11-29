class Dog {
  constructor(id, name, isGoodDog, image) {
    this.id = id;
    this.name = name;
    this.isGoodDog = isGoodDog; 
    this.image = image;
  }

  render() {
    return `
      <div style="margin: 20px; padding: 20px; display: inline-block; border: 1px solid black">
        <p>name: ${this.name}</p>
        <div class="more-info">
          <p>good dog: ${this.isGoodDog}</p>
          <img src=${this.image} style="height: 100px"></p>
        </div>
      </div>
    `
  }
}