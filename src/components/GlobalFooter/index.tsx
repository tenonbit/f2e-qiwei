import React from 'react';

export default ({ links, copyright }) => {
  return (
    <div className="globalFooter">
      {
        links && (
          <div className="links">
            {links.map(link => (
              <a
                key={link.title}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )
      }
      {copyright && <div className="copyright">{copyright}</div>}
    </div>
  );
};
