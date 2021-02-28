import { useEffect, useRef, useState } from 'react';

const useInview = ({ root = null, rootMargin, threshold = 0 }) => {
    const [inview, setInview] = useState({});
    const [node, setNode] = useState(null);

    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
            ([entry]) => {
                setInview(entry);
                observer.current.unobserve();
            },
            {
                root,
                rootMargin,
                threshold,
            },
        );

        const { current: currentObserver } = observer;

        if (node) {
            currentObserver.observe(node);
        }

        return () => currentObserver.disconnect();
    }, [node, root, rootMargin, threshold]);

    return [setNode, inview];
};

export default useInview;
