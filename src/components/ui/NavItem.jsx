/**
 * Reusable NavItem Component
 * Used across main navigation, category filters, and secondary links.
 */

function NavItem({
  icon: Icon,
  colorDot,
  label,
  badge,
  isActive = false,
  onClick
}) {
  return (
    <li>
      <button
        type="button"
        className={`nav-item-btn ${isActive ? 'active' : ''}`}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
      >
        {/* Render icon if provided */}
        {Icon && (
          <span className="nav-item-icon">
            <Icon size={18} strokeWidth={2} />
          </span>
        )}

        {/* Render category color dot if provided */}
        {colorDot && (
          <span
            className="category-dot"
            style={{ backgroundColor: colorDot }}
            aria-hidden="true"
          />
        )}

        {/* Item label */}
        <span className="nav-item-label">{label}</span>

        {/* Optional badge or count */}
        {badge !== null && badge !== undefined && (
          <span className="nav-item-badge">{badge}</span>
        )}
      </button>
    </li>
  );
}

export default NavItem;
