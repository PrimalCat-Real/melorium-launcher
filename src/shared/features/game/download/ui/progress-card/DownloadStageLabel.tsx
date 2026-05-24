interface DownloadStageLabelProps {
    stage: string
}

const DownloadStageLabel = ({ stage }: DownloadStageLabelProps) => {
    return (
        <p className="text-xs font-semibold text-foreground/70 truncate leading-none">
            {stage}
        </p>
    )
}

export default DownloadStageLabel
