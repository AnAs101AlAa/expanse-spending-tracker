import propTtypes from 'prop-types';


export default function MainWrapper({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
            <div className="absolute inset-0">
                <video autoPlay loop muted className="w-full h-full object-cover fixed top-0">
                    <source src="/backgroundVid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute top-0 w-full h-full">
                    {children}
                </div>
            </div>
        </div >
    );
}

MainWrapper.propTypes = {
    children: propTtypes.node.isRequired
}