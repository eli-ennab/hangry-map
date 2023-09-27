import { BounceLoader } from 'react-spinners'

const LoadingSpinner = () => {
    return (
        <div className={'loading-spinner-wrapper'}>
			<BounceLoader color='#5425e3' />
        </div>
    )
}

export default LoadingSpinner
