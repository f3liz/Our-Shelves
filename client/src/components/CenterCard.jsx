export default function CenterCard({ title, subtitle, actions, children }) {
    return (
        <section className="center-wrap">
            <div className="card">
                {(title || subtitle || actions) && (
                    <div className="card-header">
                        <div>
                            {title && <h1 className="card-title">{title}</h1>}
                            {subtitle && <p className="card-subtitle">{subtitle}</p>}
                        </div>
                        {actions && <div className="card-actions">{actions}</div>}
                    </div>
                )}
                <div className="card-body">
                    {children}
                </div>
            </div>
        </section>
    );
}  