export function FullScreenLoading() {
    return (
        <>
            <div className="fixed inset-0 z-[75] bg-background bg-opacity-75" />
            <div
                role="status"
                aria-live="polite"
                aria-label="Loading content"
                className="fixed top-1/2 left-1/2 z-[100] transform -translate-x-1/2 -translate-y-1/2 pl-12 pr-16 py-10"
            >
                <div className="banterWrapper">
                    <div className="banterLoader">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="banterLoaderBox" />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
