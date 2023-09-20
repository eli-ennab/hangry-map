import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import classNames from 'classnames'
import useUploadImg from '../hooks/useUploadImg.ts'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Alert from 'react-bootstrap/Alert'
interface Props {
	update: (url: string|null, ref: string|null) => void
}

const UploadImage: React.FC<Props> = ({update}) => {
	
	const uploadImg = useUploadImg()
	
	const onDrop = useCallback(async (acceptImg: File[]) => {
		if (!acceptImg.length || !uploadImg) {
			return
		}
		await uploadImg.upload(acceptImg[0])
		update(uploadImg.url, uploadImg.imgRef)
	}, [uploadImg])
	
	const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
		accept: {
			'image/gif': [],
			'image/jpeg': [],
			'image/png': [],
			'image/webp': [],
		},
		onDrop: onDrop,
		maxSize: 5 * 1024 * 1024,
		maxFiles: 1,
	})
	
	const dropzoneWrapperClasses = classNames({
		"drag-accept": isDragAccept,
		"drag-reject": isDragReject,
	})
	
	if( !uploadImg) return
		
	return (
		<>
			{uploadImg.isError && <Alert variant="danger">❌ {uploadImg.error}</Alert>}
			{uploadImg.isSuccess && <Alert variant="success">✅ Upload complete!</Alert>}
			{uploadImg.progress !== null && (
				<ProgressBar animated label={`${uploadImg.progress}%`} now={uploadImg.progress} variant="success"
				/>)}
			<div {...getRootProps()} id="dropzone-wrapper" className={dropzoneWrapperClasses}>
				<input {...getInputProps()} />
				<div className="indicator">
					{isDragActive
						? isDragAccept
							? <p>Yeah! Drop that file...</p>
							: <p>Nope, either to many images or wrong format</p>
							: <p>Drag Image here, or click to open upload</p>}
			</div>
			</div>
		</>
	)
}

export default UploadImage