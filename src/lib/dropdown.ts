import { useEffect, useRef, useState } from 'react'

export function useDropdown() {
	const dropdownBodyRef = useRef<HTMLDivElement>(null)
	const dropdownMenuRef = useRef<HTMLDivElement>(null)
	const [showDropdown, setShowDropdown] = useState<boolean>(false)
	const [showTop, setShowTop] = useState<boolean>(false)

	const openDropdown = () => {
		const bodyPosition = dropdownBodyRef.current?.getBoundingClientRect()
		const menuPosition = dropdownMenuRef.current

		const menuHeight =
			Number(menuPosition?.scrollHeight) < 300
				? menuPosition?.scrollHeight || 0
				: 300

		if (bodyPosition && menuPosition) {
			if (window.innerHeight - bodyPosition.y < menuHeight + 50) {
				setShowTop(true)
			} else {
				setShowTop(false)
			}
		}
		setShowDropdown(true)
	}

	const closeDropdown = () => {
		setShowDropdown(false)
	}

	const dropdownToggle = (status: boolean) => {
		dropdownMenuRef.current &&
			(dropdownMenuRef.current.style.height = status
				? dropdownMenuRef.current.scrollHeight + 'px'
				: '')
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (event.target) {
				const target = event.target as HTMLElement
				const isClickInside = dropdownBodyRef.current?.contains(target)

				if (!isClickInside) {
					setShowDropdown(false)
					dropdownToggle(false)
				}
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	return {
		dropdownBodyRef,
		dropdownMenuRef,
		showDropdown,
		showTop,
		openDropdown,
		closeDropdown,
		dropdownToggle
	}
}
