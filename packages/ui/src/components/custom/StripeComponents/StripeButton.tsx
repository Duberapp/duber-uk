import Button from '../DuberButton'

interface ButtonMapperProps {
  state?: "create" | "manage" | "disabled",
  disabled?: boolean,
  onClick: () => void,
  loading?: boolean,
  logo_url?: string
}

interface ManageButtonProps extends ButtonMapperProps { }
interface CreateButtonProps extends ButtonMapperProps { }

function DisabledButton({ logo_url }: ManageButtonProps) {
  return (
    <Button
      disabled={true}
      className="bg-gray-300 cursor-not-allowed h-16 w-full p-2.5"
    >
      <div className='w-full'>
        <p className="text-base font-bold text-black text-left">Manage Payouts</p>
        <img
          src={logo_url}
          className='h-3.5'
          alt=""
        />
      </div>
    </Button>
  )
}

function ManageButton({ logo_url }: ManageButtonProps) {
  return (
    <Button
      className={"stripe-button-gradient cursor-pointer h-16 w-full p-2.5"}
    >
      <a
        target="_blank"
        href="https://connect.stripe.com/express_login"
        rel="noopener noreferrer"
        className='w-full '
      >
        <p className="text-base font-bold text-black text-left">Manage Payouts</p>
        <img
          src={logo_url}
          alt=""
          className='h-3.5'
        />
      </a>
    </Button>
  )
}

export function CreateButton({ disabled, onClick, loading, logo_url }: CreateButtonProps) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      isLoading={loading}
      className={"stripe-button-gradient cursor-pointer h-16 w-full p-2.5"}
    >
      <div className="w-full">
        <p className="text-[15px] whitespace-nowrap font-bold text-black text-left">Create Stripe Account</p>
        <img
          src={logo_url}
          alt=""
        />
      </div>
    </Button>
  )
}

export function StripeButton({ state, disabled, onClick, loading = false, logo_url }: ButtonMapperProps) {
  if (state === 'manage' && disabled) {
    state = 'disabled'
  } else if (state === 'manage' && !disabled) {
    state = 'manage'
  }

  switch (state) {
    case "create":
      return <CreateButton
        disabled={disabled}
        onClick={onClick}
        loading={loading}
        logo_url={logo_url}
      />

    case "manage":
      return <ManageButton
        onClick={onClick}
        logo_url={logo_url}
      />

    case "disabled":
      return <DisabledButton
        onClick={onClick}
        logo_url={logo_url}
      />

    default:
      return <></>
  }
}