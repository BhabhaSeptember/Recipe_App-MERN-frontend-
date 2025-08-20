import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
}

//============================================================================
//============================================================================

// import React from "react";

// export default function Modal({children, onClose}) {
//   return (
//     <>
//       <div className="backdrop" onClick={onClose}></div>
//         <dialog className="modal" open>
//             {children}
//         </dialog>

//     </>
//   );
// }
