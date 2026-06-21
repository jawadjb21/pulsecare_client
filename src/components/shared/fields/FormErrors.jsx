import React from 'react';

const FormErrors = ({ errors, field }) => {
    if (!errors?.[field]) return null;
    return (
        <span className="block rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errors.name.message}
        </span>
    )
};

export default FormErrors;