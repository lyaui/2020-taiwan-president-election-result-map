function Footer() {
  const members = [
    {
      title: 'Designer',
      name: 'jhen',
      link: 'https://2023.thef2e.com/users/12061579704041679194?week=2',
    },
    {
      title: 'Frontend',
      name: 'Iris Huang',
      link: 'https://github.com/lyaui/taiwan-president-election-result-map',
    },
  ];
  return (
    <footer className='bg-background -mx-12 p-4 text-center mt-auto'>
      <p className='body-small mb-1'>版權所有©2023 台灣歷年總統 都幾?</p>
      <ul className='flex justify-center gap-2'>
        {members.map((_member) => (
          <li key={_member.name} className='caption text-center'>
            {_member.title}
            <a
              className='underline'
              href={_member.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {`@${_member.name}`}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
