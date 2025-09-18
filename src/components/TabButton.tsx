export const TabButton: React.FC<{ onClick: () => void; activeTab: string; label: string; variant: string }> = ({ onClick, activeTab, label, variant }) => {

    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 font-semibold text-base transition-colors duration-200 border-b-2 ${activeTab === variant
                ? 'text-white border-white'
                : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
        >
            {label}
        </button>
    )
}  