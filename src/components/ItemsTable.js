export default function ItemsTable({ bulk, items, handleBulk, inputs }) {
	return (
		<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="w-3 px-6 py-3 text-center">
						<input type="checkbox" checked={bulk.length === items.length} onChange={() => handleBulk('all')} />
					</th>
					{inputs.map((input) => {
						if (!input.table) return;
						return (
							<th key={input.name} scope="col" className="px-6 py-3 text-center">
								{input.name.split('_').join(' ')}
							</th>
						);
					})}
					<th scope="col" className="px-6 py-3 text-center">
						Action
					</th>
				</tr>
			</thead>
			<tbody>
				{items.map((category, key) => {
					const isChecked = bulk.find((b) => b._id === category._id);
					return (
						<tr key={key} className="border-b bg-white align-middle dark:border-gray-700 dark:bg-gray-800">
							<td className="w-3 px-6 py-4 text-center">
								<input type="checkbox" checked={isChecked} onChange={() => handleBulk(category)} />
							</td>

							{inputs.map((input) => {
								console.log('HERE', category[input.name]);
								if (!input.table) return;
								if (!Object.keys(category).includes(input.name)) return;
								if (input.name === 'images')
									return (
										<td key={input.name} className="w-1/12 px-6 py-4 text-center">
											<img src={category.images[0]} alt={category.name} height="100px" width="100%" />
										</td>
									);
								else if (typeof category[input.name] === 'object')
									return (
										<th key={input.name} scope="row" className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
											{category[input.name].name}
										</th>
									);
								else if (input.type === 'checkbox')
									return (
										<th key={input.name} scope="row" className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
											{category[input.name] ? (
												<span className="rounded-full bg-green-500 bg-opacity-30 py-1 px-3 text-green-500">Yes</span>
											) : (
												<span className="rounded-full bg-orange-500 bg-opacity-30 py-1 px-3 text-orange-500">No</span>
											)}
										</th>
									);
								else
									return (
										<th key={input.name} scope="row" className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
											{category[input.name]}
										</th>
									);
							})}
							<td className="px-6 py-4 text-center">
								<button className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-400 py-1 px-4 text-gray-50 hover:to-blue-500">Edit</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
