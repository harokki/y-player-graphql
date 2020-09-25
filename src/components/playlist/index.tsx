export const PlayList: React.FC = () => {
  return (
    <div>
      <label>アコーディオン１</label>
      <input type="checkbox" id="menu_bar01" className="accordion" />
      <ul id="links01">
        <li>
          <a href="">Link01</a>
        </li>
        <li>
          <a href="">Link02</a>
        </li>
        <li>
          <a href="">Link03</a>
        </li>
        <li>
          <a href="">Link04</a>
        </li>
      </ul>
      <label>アコーディオン２</label>
      <input type="checkbox" id="menu_bar02" className="accordion" />
      <ul id="links02">
        <li>
          <a href="">Link01</a>
        </li>
        <li>
          <a href="">Link02</a>
        </li>
        <li>
          <a href="">Link03</a>
        </li>
        <li>
          <a href="">Link04</a>
        </li>
      </ul>
    </div>
  )
}
