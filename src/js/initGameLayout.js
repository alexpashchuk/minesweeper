const initGameLayout = () => {
    document.body.insertAdjacentHTML(
        'afterbegin',
        `<main class="wrapper">
      <h1 class="title">Minesweeper</h1>
      <div class="score">Score</div>
        <div class="minesweeper">
      </div>
        <div class="settings">
        <div class="size">
         <label id="labelSize" for="size">Size</label>
         <select name="size">
           <option value="easy" selected>10x10</option>
           <option value="medium" >15x15</option>
          <option value="hard">25x25</option>
         </select>
          </div>
         <div class="bombs">
         <label id="labelRange" for="bombs">Bombs</label>
         <input type="range" name="bombs" id="bombs">
         </div>
        </div>
    </main>`
    )
}

export { initGameLayout }
