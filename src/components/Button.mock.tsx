import { cx } from 'emotion'


const mock: typeof import('@/components/Button') = {
    Button: ({
        children,
        id,
        className,
        disabled,
        title,
        onClick
    }) => {
        className = cx('mock-button', className)
        return (
            <div id={id} className={className} onClick={onClick} title={title}>
                {`Disabled: ${disabled}`}
                {children}
            </div>
        )
    }
}


export const Button = mock.Button
