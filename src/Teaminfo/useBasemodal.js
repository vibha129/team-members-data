import { useState } from "react";

// ----------------------------------------------------------------------------------

const useBaseModal = () => {
    const [isOpen, setIsOpen] = useState( false );

    const handleOpen = () => setIsOpen( true );
    const handleClose = () => setIsOpen( false );

    return Object.freeze( {
        open: handleOpen,
        close: handleClose,
        isOpen,
    } );
};


// ----------------------------------------------------------------------------------

export { useBaseModal };