import { animated as a, useTransition } from 'react-spring'
import { switcherModalRef } from 'store/switcher'
import useLockBodyScroll from 'utils/useLockBodyScroll'

import { Close } from './Icons'

type SimpleModalProps = {
  open: boolean
  onClose?: () => void
  children: JSX.Element | JSX.Element[]
}

function SimpleModal(props: SimpleModalProps) {
  const { open, onClose } = props

  const transition = useTransition(open, null, {
    ref: switcherModalRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  useLockBodyScroll(open)

  return (
    <>
      {transition.map(
        ({ item, key, props: springProps }) =>
          item && (
            <a.div
              key={key}
              className="fixed z-50 inset-0 overflow-hidden"
              style={{ opacity: springProps.opacity }}
            >
              <div className="flex items-end justify-center h-screen  text-center md:block md:p-0">
                <style jsx>{`
                  ::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-100 opacity-75" />
                </div>
                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden md:inline-block md:align-middle md:h-screen" />
                {/* <div className="fixed top-0 right-0 h-16" >
                  <Close className="m-4 w-8 h-8 cursor-pointer" onClick={onClose} />
                </div> */}
                <div
                  className="inline-block align-bottom rounded-lg text-left overflow-hidden overflow-y-scroll h-screen transform md:align-middle md:w-full z-20"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  {props.children}
                </div>
              </div>
            </a.div>
          )
      )}
    </>
  )
}

export default SimpleModal
