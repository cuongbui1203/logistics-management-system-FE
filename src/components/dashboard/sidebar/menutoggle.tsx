'use client';
interface MenuToggleProps {
  toggle: () => void;
}

export default function MenuToggle({ toggle }: MenuToggleProps) {
  return (
    <div
      style={{ height: '100vh', width: '2%', zIndex: '1' }}
      className="d-flex flex-column justify-content-center"
      id="toggle-zone"
    >
      <div
        style={{ height: '14vh', cursor: 'pointer' }}
        className="d-flex flex-column justify-content-center"
        onClick={toggle}
      >
        <div style={{ height: '40px', width: '100%' }} className="d-flex flex-row justify-content-center">
          <div id="menuToggle"></div>
        </div>
      </div>
    </div>
  );
}
