export const Table = () => {
  return (
    <section>
      <h2>Table</h2>

      <table className="neo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Chip</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Thomas</td>
            <td className="number">12345</td>
            <td>thomas@shelby.ltd</td>
            <td>
              <figure className="neo-avatar" data-initials="TA"></figure>
            </td>
            <td>
              <div
                className="neo-chip neo-chip--default"
                aria-label="Placeholder"
              >
                Placeholder
              </div>
            </td>
            <td>
              <span className="neo-icon-error"></span>
            </td>
          </tr>
          <tr>
            <td>Michael</td>
            <td className="number">12345</td>
            <td>michael@shelby.ltd</td>
            <td>
              <figure className="neo-avatar" data-initials="MD"></figure>
            </td>
            <td>
              <div
                className="neo-chip neo-chip--default"
                aria-label="Placeholder"
              >
                Placeholder
              </div>
            </td>
            <td>
              <span className="neo-icon-error"></span>
            </td>
          </tr>
          <tr>
            <td>Polly</td>
            <td className="number">12345</td>
            <td>polly@shelby.ltd</td>
            <td>
              <figure className="neo-avatar" data-initials="PD"></figure>
            </td>
            <td>
              <div
                className="neo-chip neo-chip--default"
                aria-label="Placeholder"
              >
                Placeholder
              </div>
            </td>
            <td>
              <span className="neo-icon-error"></span>
            </td>
          </tr>
          <tr>
            <td className="active">Stephen</td>
            <td className="number">12345</td>
            <td>stephen@shelby.ltd</td>
            <td>
              <figure className="neo-avatar" data-initials="SA"></figure>
            </td>
            <td>
              <div
                className="neo-chip neo-chip--default"
                aria-label="Placeholder"
              >
                Placeholder
              </div>
            </td>
            <td>
              <span className="neo-icon-error"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
